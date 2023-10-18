import { api } from "@/libs/providers/api";
import { useSettingsStore } from "@/libs/store/settings";
import {
  CharacterSearchButton,
  CharacterTextFieldSearch,
} from "@/src/styles/CharacterPick";
import {
  AccountAvatar,
  TableFeaetureButton,
  TableTextFont,
} from "@/src/styles/Settings";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  HStack,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const AccountList: React.FC = () => {
  const [
    userList,
    searchUser,
    setUserList,
    setSearchUser,
    searchUserList,
    setUserInfo,
  ] = useSettingsStore((state) => [
    state.userList,
    state.searchUser,
    state.setUserList,
    state.setSearchUser,
    state.searchUserList,
    state.setUserInfo,
  ]);
  const userListQuery = useQuery({
    queryFn: async () => {
      const listResponse = await api.get("/account/list");
      return listResponse.data.list;
    },
    queryKey: ["userList"],
    onSuccess: (data) => {
      setUserList(data);
    },
  });

  return (
    <Box w="100%">
      <HStack my={4} gap={4}>
        <CharacterTextFieldSearch
          type="text"
          placeholder="Search Users"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchUser(e.target.value);
          }}
        />
        <CharacterSearchButton
          onClick={() => {
            if (searchUser == "") {
              setUserList(userListQuery.data);
            } else {
              searchUserList(searchUser);
            }
          }}
        >
          Search
        </CharacterSearchButton>
      </HStack>

      {userListQuery.isLoading ? (
        <Center height="300px">
          <Spinner
            thickness="15px"
            speed="0.5s"
            emptyColor="#ECDEB5"
            color="#1E223F"
            width="150px"
            height="150px"
          />
        </Center>
      ) : (
        <TableContainer>
          <Table variant="stripped">
            <Thead>
              <Tr>
                <Th>
                  <TableTextFont>Avatar</TableTextFont>
                </Th>
                <Th>
                  <TableTextFont>Name</TableTextFont>
                </Th>
                <Th>
                  <TableTextFont>Role</TableTextFont>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList.map((u: any, index: any) => (
                <Tr key={index}>
                  <Td>
                    <AccountAvatar>
                      <Image src={u.avatar} alt="avatar" width="100%" />
                    </AccountAvatar>
                  </Td>
                  <Td>
                    <TableTextFont>{u.username}</TableTextFont>
                  </Td>
                  <Td>
                    <TableTextFont>{u.role}</TableTextFont>
                  </Td>
                  <Td>
                    <TableFeaetureButton
                      aria-label="edit-info"
                      icon={<EditIcon />}
                      onClick={() => {
                        setUserInfo(u);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AccountList;
