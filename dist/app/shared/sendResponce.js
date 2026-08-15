"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponce = void 0;
const sendResponce = (res, responceData) => {
    const { httpStatusCode, success, message, data } = responceData;
    res.status(httpStatusCode).json({
        success,
        message,
        data
    });
};
exports.sendResponce = sendResponce;
