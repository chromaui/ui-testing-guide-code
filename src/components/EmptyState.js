import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from '@chakra-ui/react';

export const EmptyState = ({ Icon, title, subtitle, ...props }) => (
  <Flex
    bg="white"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Text py={1}>
      <Icon color="brand.300" fontSize="5xl" />
    </Text>
    <Text color="gray.600" fontWeight="extrabold" fontSize="md" lineHeight={6}>
      {title}
    </Text>
    <Text color="gray.600" fontSize="sm" lineHeight={5}>
      {subtitle}
    </Text>
  </Flex>
);

EmptyState.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
