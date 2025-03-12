import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TaskList } from "./components/TaskList";
import { EmptyState } from "./components/EmptyState";
import { useTasks } from "./useTasks";

const FrownIcon = (props) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
  </Icon>
);

export const InboxScreen = ({ error }) => {
  const [tasks, dispatch] = useTasks();

  const archiveTask = (archive, id) => {
    dispatch({ type: archive ? "ARCHIVE_TASK" : "INBOX_TASK", id });
  };

  const togglePinTask = (state, id) => {
    dispatch({ type: state === "TASK_PINNED" ? "INBOX_TASK" : "PIN_TASK", id });
  };

  const editTitle = (title, id) => {
    dispatch({ type: "EDIT_TITLE", id, title });
  };

  if (error) {
    return (
      <EmptyState
        h="75vh"
        Icon={FrownIcon}
        title="Oh no!"
        subtitle="Something went wrong"
      />
    );
  }

  return (
    <Box p={4} bg="brand.300">
      <Box as="nav" bg="brand.200" py={6} px={5}>
        <Heading
          as="h1"
          fontSize="lg"
          lineHeight="8"
          color="brand.500"
          textAlign={["center", "center", "left"]}
        >
          Taskbox
        </Heading>
      </Box>
      <TaskList
        tasks={tasks}
        onArchiveTask={archiveTask}
        onTogglePinTask={togglePinTask}
        onEditTitle={editTitle}
      />
    </Box>
  );
};

InboxScreen.propTypes = {
  error: PropTypes.string,
};

InboxScreen.defaultProps = {
  error: null,
};
