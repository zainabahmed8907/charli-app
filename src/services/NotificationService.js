import { notification } from "antd";

const notificationService = {
    success,
    error,
    warning,
    info
};

function success(message = "", description = "") {
    notification.success({
        message,
        description
    });
}

function error(message = "", description = "") {
    notification.error({
        message,
        description
    });
}

function warning(message = "", description = "") {
    notification.warning({
        message,
        description
    });
}

function info(message = "", description = "") {
    notification.info({
        message,
        description
    });
}

export default notificationService;