'use client';

import qs from "query-string";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MagnifyingGlass, X } from "phosphor-react";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FullConversationType } from "@/app/types";
import SearchBox from "./SearchBox";

interface SearchConversationProps {
    children: React.ReactNode
}

const SearchConversation = ({
    children
}: SearchConversationProps) => {

    const router = useRouter();

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<FullConversationType[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(true);

    const bgColor = useColorModeValue('gray.100', 'gray.600')
    const bgHoverColor = useColorModeValue('gray.100', 'gray.500')
    const bgButtonColor = useColorModeValue('white', 'gray.800')

    const handleSearch = async (value: string) => {

        if (!value) {
            return;
        }

        const url = qs.stringifyUrl({
            url: "/api/conversations",
            query: { term: value },
        }, { skipEmptyString: true });

        await axios.get(url)
            .then((result) => {
                setSearchResult(result.data);
            }).catch((err) => {
                console.log(err);
                toast.error('Something went wrong!')
            });
    }

    return (
        <Stack
            h='full'
            direction='column'
        >
            <Stack id="root-stack" w='full' direction='row' alignItems='center' justifyContent='space-between'>
                <Button
                    p={1}
                    boxSize={10}
                    rounded='full'
                    bg={bgButtonColor}
                    hidden={isFocused}
                    onClick={() => {
                        setSearch('')
                        setSearchResult([])
                        setIsFocused(true)
                    }}
                >
                    <ArrowLeft size={24} />
                </Button>
                <InputGroup >
                    <InputLeftElement>
                        <MagnifyingGlass size={20} />
                    </InputLeftElement>
                    <Input
                        id="text-input"
                        rounded='full'
                        focusBorderColor='gray.400'
                        bg={bgColor}
                        value={search}
                        onFocus={() => setIsFocused(false)}
                        onChange={(e) => {
                            handleSearch(e.target.value)
                            setSearch(e.target.value)
                        }}
                    />
                    {search && (
                        <InputRightElement
                            rounded='full'
                            cursor='pointer'
                            _hover={{
                                bg: `${bgHoverColor}`
                            }}
                            onClick={() => setSearch('')}
                        >
                            <X size={20} />
                        </InputRightElement>
                    )}
                </InputGroup>
            </Stack>
            {!isFocused ? (
                <Stack>
                    {searchResult?.map((el) => (
                        <SearchBox key={el.id} conversation={el} />
                    ))}
                </Stack>
            ) : (
                children
            )}
        </Stack>
    );
}

export default SearchConversation;