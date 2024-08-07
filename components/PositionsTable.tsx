import { TPosition } from "@/models/TPosition";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { MdArrowRight, MdLocationPin } from "react-icons/md";

const PositionTable = ({
  positions,
}: {
  positions: Array<TPosition & { id: string }>;
}) => {
  function handleClick(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    positions.length && (
      <Card>
        <TableContainer>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>Konum Adı</Th>
                <Th>Konumu Düzenle</Th>
              </Tr>
            </Thead>
            <Tbody>
              {positions.map((position) => (
                <Tr key={position.id}>
                  <Td>
                    <Flex align={"center"}>
                      <Popover flip={true} placement="right-end">
                        <PopoverTrigger>
                          <Button variant={"ghost"}>
                            <Icon color={position.color} as={MdLocationPin} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverCloseButton></PopoverCloseButton>
                          <PopoverHeader>Konum bilgileri</PopoverHeader>
                          <PopoverBody>
                            <Text> Enlem: {position.position.lat}</Text>
                            <Text> Boylam: {position.position.lng}</Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                      <Text>{position.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Link as={NextLink} href={`/save/${position.id}`}>
                      <Button>
                        <Icon as={MdArrowRight}></Icon>
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    )
  );
};

export default PositionTable;
