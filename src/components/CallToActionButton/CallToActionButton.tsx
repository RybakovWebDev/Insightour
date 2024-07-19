"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { X } from "react-feather";

import styles from "./CallToActionButton.module.css";

import { useLanguageContext } from "@/contexts/LanguageContext";
import { CallToActionButton_Text } from "@/constantsText";
import useScreenWidthDetect from "@/hooks/useScreenWidthDetect";

const loadFeatures = () => import("../../features").then((res) => res.default);

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

function CallToActionButton() {
  const isMobileView = useScreenWidthDetect(1080);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedLanguage } = useLanguageContext();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setNameText("");
    setPhoneText("");
    setCommentText("");
    setErrorText("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setMessageSent(true);
      console.log("Sent");
    } catch (error) {
      setErrorText(`${error}. Could not send contact data 😥`);
      console.error("An error occurred while submitting the form!", error);
    }
    setIsLoading(false);
  };

  return (
    <section>
      <button className={styles.button} onClick={handleOpenModal}>
        {CallToActionButton_Text.button[selectedLanguage]}
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
                <div className={styles.topInputWrapper}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor='name'>{CallToActionButton_Text.name[selectedLanguage]}:</label>
                    <input
                      ref={nameInputRef}
                      type='text'
                      name='name'
                      required
                      placeholder={CallToActionButton_Text.namePlaceholder[selectedLanguage]}
                      value={nameText}
                      maxLength={50}
                      onChange={(e) => setNameText(e.target.value)}
                    />

                    <m.button
                      type='button'
                      className={styles.closeButton}
                      onClick={handleCloseModal}
                      initial={{ background: "rgb(248, 240, 255)" }}
                      whileHover={{ background: "rgb(109, 48, 157, 0.3)" }}
                    >
                      <X size={30} strokeWidth={1} />
                    </m.button>
                  </div>

                  <div className={styles.inputWrapper}>
                    <label htmlFor='phone'>{CallToActionButton_Text.Whatsapp[selectedLanguage]}:</label>
                    <input
                      type='text'
                      name='phone'
                      required
                      placeholder={CallToActionButton_Text.WhatsappPlaceholder[selectedLanguage]}
                      value={phoneText}
                      maxLength={50}
                      onChange={(e) => setPhoneText(e.target.value)}
                    />
                  </div>

                  <label htmlFor='comment'>{CallToActionButton_Text.comment[selectedLanguage]}:</label>
                  <textarea
                    name='comment'
                    cols={60}
                    rows={4}
                    spellCheck
                    placeholder={CallToActionButton_Text.commentPlaceholder[selectedLanguage]}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
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
                            disabled={isLoading}
                            initial={{ background: "rgb(0, 0, 0, 0)", opacity: 0 }}
                            whileHover={{ background: isLoading ? "transparent" : "rgb(0, 0, 0, 0.1)" }}
                            whileTap={{ background: isLoading ? "none" : "rgb(0, 0, 0, 0.3)" }}
                            animate={{ opacity: isLoading ? 0.5 : 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "spring", damping: 80, stiffness: 700 }}
                          >
                            <AnimatePresence mode='wait'>
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
                            </AnimatePresence>
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
