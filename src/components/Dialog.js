import { useRef, useState, useEffect } from 'react';
import {
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Spinner,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useQuery } from 'urql';

const UserQuery = `
  query GetUserInfo {
    user {
      isAuthorized
    }
  }
`;

/**
 * Component description:
 *   An “open” button, which, on click, opens a modal.
 *   The modal is rooted on an element above the button in the DOM (e.d. <body>).
 *   - On opening the modal, a GraphQL request is made (to /graphql).
 *   - On request error, the modal displays some error message.
 *   - Otherwise, the modal displays a “confirm” button, which, on click, makes a REST POST request.
 *   - On request error, the modal displays a different error message.
 *   - On success, the modal closes.
 *
 * Story variations:
 *   1. Click “open” button, GraphQL request fails
 *   2. Click “open” button, GraphQL request succeeds
 *   3. Click “open” button, GraphQL request succeeds, click “confirm”, REST request fails
 *   4. Click “open” button, GraphQL request succeeds, click “confirm”, REST request succeeds
 */

const DialogContent = ({
  data,
  fetching,
  error,
  onClose,
  onConfirm,
  cancelRef,
}) => {
  if (fetching) {
    return (
      <AlertDialogContent>
        <AlertDialogBody
          as={Flex}
          py={8}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.300"
            size="xl"
          />
        </AlertDialogBody>
      </AlertDialogContent>
    );
  }

  if (error) {
    return (
      <AlertDialogContent>
        <Box px={3} py={8}>
          Oh no... {error.message}
        </Box>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Delete Customer
      </AlertDialogHeader>

      {data.user.isAuthorized ? (
        <>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              ml={3}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </>
      ) : (
        <AlertDialogBody mb={4}>
          You don't have permission to delete this customer.
        </AlertDialogBody>
      )}
    </AlertDialogContent>
  );
};

function useDeleteCustomer(customerId) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isDeleting) return;

    fetch(`/customers/${customerId}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Something went wrong');
      })
      .then((data) => {
        setIsDeleting(false);
        setData(data);
      })
      .catch((error) => {
        setIsDeleting(false);
        setError(error.message);
      });
  }, [isDeleting, customerId]);

  return [{ data, error }, () => setIsDeleting(true)];
}

export function Dialog({ customerId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [result] = useQuery({
    query: UserQuery,
    pause: !isOpen,
  });

  const [deleteResult, deleteCustomer] = useDeleteCustomer(customerId);

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen}>
        Delete Customer
      </Button>

      {deleteResult.error && (
        <Alert mt={4} status="error">
          <AlertIcon />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{deleteResult.error.message}</AlertDescription>
        </Alert>
      )}

      {deleteResult.data && (
        <Alert mt={4} status="success">
          <AlertIcon />
          {deleteResult.data}
        </Alert>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <DialogContent
            {...result}
            onClose={onClose}
            onConfirm={deleteCustomer}
            cancelRef={cancelRef}
          />
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
