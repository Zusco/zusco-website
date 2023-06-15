import { Toaster, ToastBar, toast } from "react-hot-toast";
import Success from "assets/icons/toast/success.svg";
import Error from "assets/icons/toast/error.svg";
import Warning from "assets/icons/toast/warning.svg";
import styled from "styled-components";

const DEFAULT_TOAST_DURATION = 5000000;

const defaultConfig = { duration: DEFAULT_TOAST_DURATION };

const ToastLoader = styled.div`
  height: 5px;
  background-color: var(--zusco-blue);
  position: absolute;
  left: -200%;
  bottom: 0;
  width: 200%;
  animation: slide-right ${(props) => props.duration / 1000}s ease forwards;

  @keyframes slide-right {
    0% {
    }
    50% {
    }
    100% {
      left: -100%;
    }
  }
`;

const Toast = () => {
  return (
    <Toaster position="top-right" containerClassName="!z-[9999999]">
      {(t) => (
        <ToastBar
          toast={t}
          position="top-right"
          style={{
            width: "396px",
            minHeight: "105px",
            background: "#FFFFFF",
            boxShadow: "0px 0px 10px rgba(225, 231, 242, 0.8)",
            borderRadius: "8px",
            padding: "20px",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {({ icon, message }) => {
            const toastIcon =
              t.type === "error" ? (
                <Error />
              ) : t.type === "success" ? (
                <Success />
              ) : message.props.role === "warning" ? (
                <Warning />
              ) : (
                icon
              );
            return (
              <div className="w-full">
                <div className="flex justify-between align-start w-full">
                  <div className="flex justify-between align-start">
                    <div className="mr-[20px]">{toastIcon}</div>
                    <div className="flex flex-col justify-center items-start">
                      <span className="helv-medium text-base">
                        {message.props.title}
                      </span>
                      {message.props.children && (
                        <p className="helv-regular text-grey  text-sm mt-[9px]">
                          {message.props.children}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="ml-auto">
                    <p
                      onClick={() => toast.dismiss(t.id)}
                      className="text-blue helv-medium text-[12px] cursor-pointer"
                    >
                      Close
                    </p>
                  </div>
                </div>
                <ToastLoader duration={t.duration} />
              </div>
            );
          }}
        </ToastBar>
      )}
    </Toaster>
  );
};

export const warningToast = (title, message) => {
  toast(message, {
    ...defaultConfig,
    ariaProps: {
      role: "warning",
      title,
    },
  });
};

export const successToast = (title, message) => {
  toast.success(message, {
    ...defaultConfig,
    ariaProps: {
      role: "success",
      title,
    },
  });
};

export const errorToast = (title, message) => {
  toast.error(message, {
    ...defaultConfig,
    ariaProps: {
      role: "error",
      title,
    },
  });
};

export default Toast;
