import React, { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Modal,
  Notification,
} from "@mantine/core";
import classes from "./Profile.module.css";

export function Profile() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationNotice, setShowConfirmationNotice] = useState(false);
  const [showEmptyFieldNotice, setShowEmptyFieldNotice] = useState(false);

  useEffect(() => {
    if (showConfirmationNotice) {
      const timer = setTimeout(() => {
        setShowConfirmationNotice(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfirmationNotice]);

  useEffect(() => {
    if (showEmptyFieldNotice) {
      const timer = setTimeout(() => {
        setShowEmptyFieldNotice(false);
      }, 3000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showEmptyFieldNotice]);

  const handleConfirm = () => {
    setShowConfirmationNotice(true);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (userId.trim() === "" || password.trim() === "") {
      setShowEmptyFieldNotice(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <Container size={420} my={100}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={70} mt={10} radius="sm">
        <TextInput
          label="UserID"
          placeholder="J1234567"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          mt="md"
        />

        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>

      <Modal
        title="Confirm Details"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classNames={{
          content: classes.modalContent,
        }}
      >
        <Text>Please confirm the details you entered:</Text>

        <TextInput label="User ID" value={userId} />
        <TextInput label="Password" value={password} />

        <div className={classes.modalButtons}>
          <Button className={classes.modalButton} onClick={handleConfirm}>
            Confirm
          </Button>
          <Button
            className={classes.modalButton}
            variant="light"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <div className={classes.notiContainer}>
        {showConfirmationNotice && (
          <Notification
            title="Login Confirmed!"
            color="teal"
            onClose={() => setShowConfirmationNotice(false)}
            withCloseButton
            className={classes.notification}
          />
        )}

        {showEmptyFieldNotice && (
          <Notification
            title="Please fill in all fields!"
            color="red"
            onClose={() => setShowEmptyFieldNotice(false)}
            withCloseButton
            className={classes.notification}
          />
        )}
      </div>
    </Container>
  );
}

export default Profile;
