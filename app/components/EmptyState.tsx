import { Box, Text } from "@chakra-ui/react";

const EmptyState = () => {
    return (
        <Box
            display='flex'
            px={4}
            py={10}
            minH='full'
            minW='full'
            justifyContent='center'
            alignItems='center'
            bgColor='gray.100'
        >
            <Box
                display='flex'
                textAlign='center'
                alignItems='center'
                flexDirection='column'
            >
                <Text fontSize='xl' fontWeight='bold' color='gray.900'>Select a chat or start a new converstation</Text>
            </Box>
        </Box>
    );
}

export default EmptyState;