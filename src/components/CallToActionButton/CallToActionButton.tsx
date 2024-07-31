"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { X } from "react-feather";

import styles from "./CallToActionButton.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { CallToActionButton_Text } from "@/constantsText";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";

const loadFeatures = () => import("../../features").then((res) => res.default);

interface CallToActionButtonProps {
  call?: boolean;
}

const simpleFadeVarians = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function CallToActionButton({ call }: CallToActionButtonProps) {
  const isMobileView = useScreenWidthDetect(1080);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const { selectedLanguage } = useLanguageContext();

  const isArabic = selectedLanguage === "ar";

  const nameInputRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setNameText("");
    setPhoneText("");
    setCommentText("");
    setErrorText("");
    setFormTouched(false);
  };

  useEffect(() => {
    if (modalOpen && !isMobileView && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [modalOpen, isMobileView]);

  const handleOpenModal = () => {
    !modalOpen && setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    clearForm();
    setMessageSent(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setNameText(value);
        break;
      case "phone":
        setPhoneText(value);
        break;
      case "comment":
        setCommentText(value);
        break;
    }
    setFormTouched(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText("");
    setMessageSent(false);
    setFormTouched(false);

    const formData = {
      name: nameText,
      phone: phoneText,
      comment: commentText,
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorText("You've submitted too many forms. Please try again later.");
        } else if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const errorMessage = data.errors.join(". ");
          setErrorText(`${errorMessage}. Please check your input.`);
        } else {
          setErrorText(data.message || "Could not send contact data 😥");
        }
      } else {
        setMessageSent(true);
        console.log("Sent");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form!", error);
      setErrorText("Could not send contact data. Please try again later. 😥");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <button className={styles.button} onClick={handleOpenModal}>
        {call
          ? CallToActionButton_Text.buttonAppointment[selectedLanguage]
          : CallToActionButton_Text.button[selectedLanguage]}
      </button>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {modalOpen && (
            <m.div className={styles.formWrapper}>
              <m.div
                className={styles.formBackdrop}
                initial='hidden'
                animate='show'
                exit='exit'
                variants={simpleFadeVarians}
                onClick={handleCloseModal}
              />
              <m.form
                name='contact form'
                className={styles.form}
                initial={{ y: "100vh" }}
                animate={{ y: 0, transition: { duration: 0.3 } }}
                exit={{ y: "100vh", transition: { duration: 0.3 } }}
                onSubmit={(e) => handleSubmit(e)}
              >
                <m.button
                  type='button'
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                  initial={{ background: "rgb(248, 240, 255)" }}
                  whileHover={{ background: "rgb(109, 48, 157, 0.3)" }}
                >
                  <X size={30} strokeWidth={1} />
                </m.button>
                <div className={styles.topInputWrapper}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor='name'>
                      {isArabic && ":"}
                      {CallToActionButton_Text.name[selectedLanguage]}
                      {!isArabic && ":"}
                    </label>
                    <input
                      ref={nameInputRef}
                      type='text'
                      name='name'
                      required
                      placeholder={CallToActionButton_Text.namePlaceholder[selectedLanguage]}
                      value={nameText}
                      minLength={2}
                      maxLength={80}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <label htmlFor='phone'>
                      {isArabic && ":"}
                      {CallToActionButton_Text.Whatsapp[selectedLanguage]}
                      {!isArabic && ":"}
                    </label>
                    <input
                      type='text'
                      name='phone'
                      required
                      placeholder={CallToActionButton_Text.WhatsappPlaceholder[selectedLanguage]}
                      value={phoneText}
                      maxLength={25}
                      onChange={handleInputChange}
                    />
                  </div>

                  <label htmlFor='comment'>
                    {isArabic && ":"}
                    {CallToActionButton_Text.comment[selectedLanguage]}
                    {!isArabic && ":"}
                  </label>
                  <textarea
                    name='comment'
                    cols={60}
                    rows={4}
                    spellCheck
                    placeholder={CallToActionButton_Text.commentPlaceholder[selectedLanguage]}
                    value={commentText}
                    maxLength={500}
                    onChange={handleInputChange}
                  />

                  <div className={styles.sendWrapper}>
                    <div>
                      <AnimatePresence>
                        {errorText ? (
                          <m.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {errorText}
                          </m.p>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    <>
                      {messageSent ? (
                        <AnimatePresence mode='wait'>
                          <m.p
                            key='sentMessage'
                            className={styles.sentMessage}
                            initial='hidden'
                            animate='show'
                            exit='exit'
                            variants={simpleFadeVarians}
                          >
                            {CallToActionButton_Text.success[selectedLanguage]}
                          </m.p>
                        </AnimatePresence>
                      ) : (
                        <AnimatePresence mode='wait'>
                          <m.button
                            key='submitButton'
                            type='submit'
                            disabled={isLoading || !formTouched}
                            initial={{ background: "rgb(0, 0, 0, 0)", opacity: 0 }}
                            whileHover={{ background: isLoading ? "rgb(0, 0, 0, 0)" : "rgb(0, 0, 0, 0.1)" }}
                            whileTap={{ background: isLoading ? "rgb(0, 0, 0, 0)" : "rgb(0, 0, 0, 0.3)" }}
                            animate={{ opacity: isLoading ? 0.5 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", damping: 80, stiffness: 700 }}
                          >
                            {isLoading ? (
                              <m.span
                                key={"sendbtnspinner"}
                                initial='hidden'
                                animate='show'
                                exit='exit'
                                variants={simpleFadeVarians}
                                className={styles.loader}
                              ></m.span>
                            ) : (
                              <m.p
                                key={"sendbtntext"}
                                initial='hidden'
                                animate='show'
                                exit='exit'
                                variants={simpleFadeVarians}
                              >
                                {CallToActionButton_Text.send[selectedLanguage]}
                              </m.p>
                            )}
                          </m.button>
                        </AnimatePresence>
                      )}
                    </>
                  </div>
                </div>
              </m.form>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </section>
  );
}

export default CallToActionButton;
