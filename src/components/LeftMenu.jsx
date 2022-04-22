import React from "react";
import {
  Flex,
  CloseButton,
  HStack,
  VStack,
  Image,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import { MenuOptions } from "../constants/MenuOptions";

const LeftMenu = (props) => {
  const mainMenus = Object.keys(MenuOptions);

  const MenuAccordians = mainMenus.map((menu) => {
    const menuItem = MenuOptions[menu];
    return (
      <AccordionItem key={menuItem.id}>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text textColor="#99A4B1" fontSize="18px">
                {menuItem.title}
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {menuItem.subMenus.map((subMenu) => {
            return (
              <HStack key={subMenu.id} p={1} justifyContent="left" spacing={4}>
                <Image src={`/images/${subMenu.icon}.svg`} />
                <Text textColor="#FFFFFF" fontSize="18px" key={subMenu.id}>
                  {subMenu.title}
                </Text>
              </HStack>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Box w="inherit" h="100%" bg="#242835" p={2}>
      <VStack spacing="24px">
        <Flex p={1} alignItems="center" justifyContent="space-evenly">
          <Image src="/images/filmtwine_logo.svg" />
          <CloseButton
            marginTop="4px"
            color="white"
            {...props.getButtonProps()}
          />
        </Flex>
        <Accordion defaultIndex={[0]} allowToggle allowMultiple w="100%">
          {MenuAccordians}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default LeftMenu;
