import { ElMessage } from 'element-plus';

const messageQueue = []
let showingMessageFlag = false;
let currentMessageInstance = null;

const showMessage = (messageOptions) => {
    if (showingMessageFlag) {
        messageQueue.push(messageOptions);
        if (currentMessageInstance) {
            currentMessageInstance.close();
        }
        return;
    }
    showingMessageFlag = true;
    currentMessageInstance = ElMessage({
        ...messageOptions,
        onClose: () => {
            showingMessageFlag = false
            currentMessageInstance = null;
            if (messageQueue.length > 0) {
                const nextMessage = messageQueue.shift();
                showMessage(nextMessage);
            }

        }
    })
}

const message = {
    error: (msg) => {
        showMessage({ message: msg, type: "error", duration: 2000 });
    },
    success: (msg) => {
        showMessage({ message: msg, type: "success", duration: 2000 });
    },
    warning: (msg) => {
        showMessage({ message: msg, type: "warning", duration: 2000 });
    },
    info: (msg) => {
        showMessage({ message: msg, type: "info", duration: 2000 });
    },
}

export default message;