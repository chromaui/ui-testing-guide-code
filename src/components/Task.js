import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Flex,
  IconButton,
  Input,
  Box,
  VisuallyHidden,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

export const Task = ({
  task: { id, title, state },
  onArchiveTask,
  onTogglePinTask,
  onEditTitle,
  ...props
}) => (
  <Flex
    as="li"
    _notLast={{
      borderBottom: '1px',
      borderColor: 'gray.200',
    }}
    h={12}
    bg="white"
    alignItems="center"
    _hover={{
      bgGradient: 'linear(to-b,  brand.100,  brand.50)',
    }}
    aria-label={title}
    tabIndex="0"
    {...props}
  >
    <Checkbox
      px={4}
      isChecked={state === 'TASK_ARCHIVED'}
      onChange={(e) => onArchiveTask(e.target.checked, id)}
    >
      <VisuallyHidden>Archive</VisuallyHidden>
    </Checkbox>
    <Box width="full" as="label">
      <VisuallyHidden>Edit</VisuallyHidden>
      <Input
        variant="unstyled"
        flex="1 1 auto"
        color={state === 'TASK_ARCHIVED' ? 'gray.400' : 'gray.700'}
        textDecoration={state === 'TASK_ARCHIVED' ? 'line-through' : 'none'}
        fontSize="md"
        fontWeight="bold"
        isTruncated
        value={title}
        onChange={(e) => onEditTitle(e.target.value, id)}
      />
    </Box>
    <IconButton
      p={5}
      flex="none"
      aria-label={state === 'TASK_PINNED' ? 'unpin' : 'pin'}
      variant={state === 'TASK_PINNED' ? 'unpin' : 'pin'}
      icon={<BellIcon />}
      onClick={() => onTogglePinTask(state, id)}
    />
  </Flex>
);

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  onArchiveTask: PropTypes.func.isRequired,
  onTogglePinTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
};
