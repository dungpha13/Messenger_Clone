import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getArchiveds from "../actions/getArchiveds";
import ArchivedList from "./_components/ArchivedList";

export default async function ArchivedsLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const archiveds = await getArchiveds();

    return (
        <Box
            h='full'
            w='full'
            display='flex'
            justifyContent="space-between"
        >
            <Sidebar />
            <ArchivedList archiveds={archiveds} />
            {children}
        </Box>
    );
}