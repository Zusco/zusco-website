import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

import AppSwitch from "components/general/switch";
import SettingsStore from "../store";

const SettingsHome = () => {
  const [form, setForm] = useState({
    push_notification: false,
    chat_banner_notification: false,
    chat_notification: false,
  });
  const [loadingStates, setLoadingStates] = useState([]);
  const { getSettings, settings, updateLoading, updateSettings } =
    SettingsStore;

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    handleFormUpdate();
  }, [settings]);

  const handleFormUpdate = () => {
    setForm({
      push_notification: settings?.push_notification,
      chat_banner_notification: settings?.chat_banner_notification,
      chat_notification: settings?.chat_notification,
    });
  };

  const updateSetting = async (prop, val) => {
    setLoadingStates((prev) => [...prev, prop]);
    await updateSettings({ [prop]: val });
    setLoadingStates((prev) => prev.filter((state) => state != prop));
  };
  return (
    <section className="py-6 pl-6 pr-6 sm:pr-12">
      <div className="flex justify-between">
        <p className="text-[#211D31] text-[19px] regular-font">Settings</p>
      </div>

      <br />

      <main className="flex flex-col gap-6 text-black regular-font">
        <Link className="flex flex-col gap-3" href="/dashboard/profile">
          <h3 className="text-[#ADB1B8] text-[14px]">ACCOUNT</h3>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px]">Edit Profile</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-3">
          <h3 className="text-[#ADB1B8] text-[14px]">NOTIFICATION</h3>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">Push Notification</p>
            <AppSwitch
              checked={form.push_notification}
              onChange={() =>
                updateSetting("push_notification", !form.push_notification)
              }
              loading={
                updateLoading && loadingStates.includes("push_notification")
              }
            />
          </div>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">
              Chat Banner Notification
            </p>
            <AppSwitch
              checked={form.chat_banner_notification}
              onChange={() =>
                updateSetting(
                  "chat_banner_notification",
                  !form.chat_banner_notification
                )
              }
              loading={
                updateLoading &&
                loadingStates.includes("chat_banner_notification")
              }
            />
          </div>
          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <p className="text-[19px] whitespace-nowrap">Chat Notification</p>
            <AppSwitch
              checked={form.chat_notification}
              onChange={() =>
                updateSetting("chat_notification", !form.chat_notification)
              }
              loading={
                updateLoading && loadingStates.includes("chat_notification")
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[#ADB1B8] text-[14px]">TERMS AND SUPPORT</h3>
          <Link
            href="/platform/terms"
            className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center"
          >
            <p className="text-[19px]">Terms and Conditions</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </Link>

          <Link
            href="/platform/privacy-policy"
            className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center"
          >
            <p className="text-[19px]">Privacy Policy</p>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </Link>

          <div className="flex justify-between px-6 py-4 md:py-6 bg-white border-[0.5px] border-[#E7EAEE] items-center">
            <a
              href="mailto:info@getzusco.com"
              target="_blank"
              rel="noreferrer"
              className="text-[19px]"
            >
              Support & F.A.Q
            </a>
            <span>
              <AiOutlineRight size={16} />
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default observer(SettingsHome);
