"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { X } from "react-feather";

import styles from "./CallToActionButton.module.css";

const loadFeatures = () => import("../../features").then((res) => res.default);

function CallToActionButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nameText, setNameText] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [messengerText, setMessengerText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setNameText("");
    setPhoneText("");
    setMessengerText("");
    setEmailText("");
    setCommentText("");
    setErrorText("");
  };

  // useEffect(() => {
  //   if (modalOpen && !smallScreen && nameInputRef.current) {
  //     nameInputRef.current.focus();
  //   }
  // }, [modalOpen]);

  const handleOpenModal = () => {
    !modalOpen && setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    clearForm();
    setMessageSent(false);
  };
  // console.log(process.env.NEXT_PUBLIC_FORM_URL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formURL = "";

    // if (!formURL) {
    //   return;
    // }

    const formData = {
      name: nameText,
      phone: phoneText,
      messenger: messengerText,
      email: emailText,
      comment: commentText,
    };
    setMessageSent(true);
    console.log("Sent");
    try {
      // const response = await fetch(formURL, {
      //   method: "POST",
      //   body: JSON.stringify(formData),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   mode: "no-cors",
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      // clearForm();
      setMessageSent(true);
      console.log("Sent");
    } catch (error) {
      setErrorText(`${error}. Could not send contact data 😥`);
      console.error("An error occurred while submitting the form!", error);
    }
  };

  return (
    <section>
      <button className={styles.button} onClick={handleOpenModal}>
        Book Tour
      </button>
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {modalOpen && (
            <m.div className={styles.formWrapper}>
              <m.div
                className={styles.formBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                    <label htmlFor='name'>Name:</label>
                    <input
                      ref={nameInputRef}
                      type='text'
                      name='name'
                      required
                      placeholder='Name'
                      value={nameText}
                      maxLength={50}
                      onChange={(e) => setNameText(e.target.value)}
                    />

                    <m.button
                      type='button'
                      className={styles.closeButton}
                      onClick={handleCloseModal}
                      // initial={{ border: "1px solid rgb(0, 0, 0, 0)" }}
                      // whileHover={!smallScreen && { border: "1px solid rgb(0, 0, 0, 0.3)", rotate: "90deg" }}
                    >
                      <X size={30} strokeWidth={1} />
                    </m.button>
                  </div>

                  <div className={styles.inputWrapper}>
                    <label htmlFor='phone'>Whatsapp number:</label>
                    <input
                      type='text'
                      name='phone'
                      required
                      placeholder='Phone number'
                      value={phoneText}
                      maxLength={50}
                      onChange={(e) => setPhoneText(e.target.value)}
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <label htmlFor='email'>Contact email:</label>
                    <input
                      type='email'
                      name='email'
                      required
                      placeholder='Email'
                      value={emailText}
                      maxLength={50}
                      onChange={(e) => setEmailText(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor='comment'>Comment:</label>
                <textarea
                  name='comment'
                  cols={60}
                  rows={4}
                  spellCheck
                  placeholder='Comment text'
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
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Message sent! We will contact you soon 😊
                        </m.p>
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence mode='wait'>
                        <m.button
                          key='submitButton'
                          type='submit'
                          initial={{ background: "rgb(0, 0, 0, 0)", opacity: 0 }}
                          whileHover={{ background: "rgb(0, 0, 0, 0.1)" }}
                          whileTap={{ background: "rgb(0, 0, 0, 0.3)" }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", damping: 80, stiffness: 700 }}
                        >
                          <p>Send</p>
                        </m.button>
                      </AnimatePresence>
                    )}
                  </>
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
