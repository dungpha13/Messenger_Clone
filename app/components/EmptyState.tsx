import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const EmptyState = () => {

    const bgColor = useColorModeValue('gray.100', '#1a202c')
    const textColor = useColorModeValue('gray.900', 'white')

    return (
        <Box
            display='flex'
            px={4}
            py={10}
            minH='full'
            minW='full'
            justifyContent='center'
            alignItems='center'
            bgColor={bgColor}
            boxShadow='-3px 0px 5px rgba(0, 0, 0, 0.1)'
        >
            <Box
                display='flex'
                textAlign='center'
                alignItems='center'
                flexDirection='column'
            >
                <Text fontSize='xl' fontWeight='bold' color={textColor}>Select a chat or start a new converstation</Text>
            </Box>
        </Box>
    );
}

export default EmptyState;