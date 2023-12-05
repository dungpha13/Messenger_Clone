import { Button } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return (
        <Button
            onClick={onClick}
            w='full'
            justifyContent='center'
            rounded='md'
            bg='white'
            px={4}
            py={2}
            textColor='gray.500'
            boxShadow='md'
            p='6'
            _hover={{
                bg: 'gray.50'
            }}
            _focus={{
                outlineOffset: '0px'
            }}
        >
            <Icon />
        </Button>
    );
}

export default AuthSocialButton;