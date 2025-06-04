"use client";

import { useEffect } from "react";

const ModalCleanup = () => {
  useEffect(() => {
    // 清理 Bootstrap 模态框的状态
    const cleanupModal = () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";

      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.parentNode?.removeChild(backdrop);
      }
    };

    cleanupModal();
  }, []);

  return null;
};

export default ModalCleanup;
