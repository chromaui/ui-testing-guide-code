import React from 'react';
import PropTypes from 'prop-types';
import { VStack, Skeleton, Flex, Spacer } from '@chakra-ui/react';
import { CheckIcon, StarIcon } from '@chakra-ui/icons';
import { Task } from './Task';
import { EmptyState } from './EmptyState';

const LoadingTask = () => (
  <Flex
    _notLast={{
      borderBottom: '1px',
      borderColor: 'gray.200',
    }}
    bg="white"
    alignItems="center"
    h={12}
    p={4}
    aria-busy="true"
  >
    <Skeleton height={4} width={4} mr={4} />
    <Skeleton height={4} width={40} mr={2} />
    <Skeleton height={4} width={6} mr={2} />
    <Skeleton height={4} width={12} />
    <Spacer />
    <StarIcon aria-hidden="true" height={4} width={4} color="gray.200" />
  </Flex>
);

export function TaskList({
  loading,
  tasks,
  onTogglePinTask,
  onArchiveTask,
  onEditTitle,
  onDeleteTask,
}) {
  const events = {
    onTogglePinTask,
    onArchiveTask,
    onEditTitle,
    onDeleteTask,
  };

  if (loading) {
    return (
      <VStack align="stretch" spacing={0}>
        <LoadingTask />
        <LoadingTask />
        <LoadingTask />
      </VStack>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        minHeight={72}
        Icon={CheckIcon}
        title="You have no tasks"
        subtitle="Sit back and relax"
      />
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ];

  return (
    <VStack as="ul" align="stretch" spacing={0} aria-label="tasks">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </VStack>
  );
}

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onTogglePinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  loading: false,
};
