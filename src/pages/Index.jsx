import { Container, Textarea, Button, VStack, Text, Box, Code } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Index = () => {
  const [fortranCode, setFortranCode] = useState("");
  const [plantUMLCode, setPlantUMLCode] = useState("");

  const convertToPlantUML = (code) => {
    const lines = code.split("\n");
    let plantUML = "@startuml\n";
    let currentSubroutine = null;

    lines.forEach((line) => {
      line = line.trim();
      if (line.toLowerCase().startsWith("subroutine")) {
        const subroutineName = line.split(" ")[1].split("(")[0];
        currentSubroutine = subroutineName;
        plantUML += `class ${subroutineName} {\n`;
      } else if (line.toLowerCase().startsWith("end")) {
        if (currentSubroutine) {
          plantUML += "}\n";
          currentSubroutine = null;
        }
      } else if (line.startsWith("C") || line.startsWith("c") || line.startsWith("!")) {
        plantUML += `  ' ${line.substring(1).trim()}\n`;
      } else if (currentSubroutine) {
        plantUML += `  ${line}\n`;
      }
    });

    plantUML += "@enduml";
    return plantUML;
  };

  const handleConvert = () => {
    const plantUML = convertToPlantUML(fortranCode);
    setPlantUMLCode(plantUML);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Fortran77 to PlantUML Converter</Text>
        <Textarea placeholder="Enter Fortran77 code here..." value={fortranCode} onChange={(e) => setFortranCode(e.target.value)} height="200px" />
        <Button leftIcon={<FaArrowRight />} colorScheme="teal" onClick={handleConvert}>
          Convert
        </Button>
        {plantUMLCode && (
          <Box width="100%" p={4} bg="gray.100" borderRadius="md">
            <Text fontSize="lg" mb={2}>
              PlantUML Code:
            </Text>
            <Code whiteSpace="pre" width="100%">
              {plantUMLCode}
            </Code>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
