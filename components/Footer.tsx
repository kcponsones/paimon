import {
  CreatedByIcon,
  DesignerIcon,
  DeveloperIcon,
} from "@/libs/includes/icons";
import { FooterBox } from "@/src/styles";
import { Flex, SimpleGrid } from "@chakra-ui/react";

const Footer = () => {
  return (
    <FooterBox>
      <SimpleGrid columns={3}>
        <Flex justifyContent="start" alignItems="center" direction="row">
          <DeveloperIcon />
          Developed By:
          <a href="https://github.com/ikigamisama" target="_blank">
            Ikigami
          </a>
        </Flex>
        <Flex justifyContent="center" alignItems="center" direction="row">
          <CreatedByIcon />
          Created By:
          <a href="https://www.facebook.com/chillwithkero" target="_blank">
            Kero
          </a>
        </Flex>
        <Flex justifyContent="end" alignItems="center" direction="row">
          <DesignerIcon />
          Layout Design By:
          <a href="https://twitch.tv/KiniritsTV" target="_blank">
            Kinirits
          </a>
        </Flex>
      </SimpleGrid>
    </FooterBox>
  );
};

export default Footer;
