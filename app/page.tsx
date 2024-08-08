"use client";

import PositionTable from "@/components/PositionsTable";
import { useStore } from "@/store";

import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Stack,
  Table,
  TableContainer,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Page = () => {
  const store = useStore();

  return (
    <Container py={8}>
      <Stack spacing={8}>
        <Text fontSize={"4xl"} fontWeight={600}>
          XMap Konum Listesi
        </Text>

        <Flex>
          <Flex flexGrow={1}>
            <Link as={NextLink} href="/save">
              <Button variant={"link"}>Yeni Konum Oluştur</Button>
            </Link>
          </Flex>
          <Flex flexGrow={1}>
            <Link as={NextLink} href="/route-creation">
              <Button variant={"link"}>Rota oluştur</Button>
            </Link>
          </Flex>
        </Flex>

        <PositionTable positions={store.positions}></PositionTable>
      </Stack>
    </Container>
  );
};

export default Page;
