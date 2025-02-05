import React from 'react';
import { Card, Title, Text, Stack, Button, Divider, Group, Badge, List } from '@mantine/core';
import { IconVolume } from '@tabler/icons-react';

export function WordDefinition({ data }) {
  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const mainPhonetic = data.phonetics.find(p => p.audio) || data.phonetics[0];

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder className="w-full max-w-2xl">
      <Stack>
        <div>
          <Title order={1}>{data.word}</Title>
          {mainPhonetic && (
            <Group mt="xs">
              <Text size="xl" c="dimmed">{mainPhonetic.text}</Text>
              {mainPhonetic.audio && (
                <Button
                  variant="subtle"
                  onClick={() => playAudio(mainPhonetic.audio)}
                  leftSection={<IconVolume size={20} />}
                >
                  Play
                </Button>
              )}
            </Group>
          )}
        </div>

        {data.origin && (
          <>
            <Title order={3}>Origin</Title>
            <Text c="dimmed">{data.origin}</Text>
          </>
        )}

        <Stack gap="lg">
          {data.meanings.map((meaning, index) => (
            <div key={index}>
              <Group justify="space-between" align="center">
                <Badge size="lg" variant="light">
                  {meaning.partOfSpeech}
                </Badge>
                <Divider className="flex-grow" />
              </Group>
              
              <List spacing="md" mt="md">
                {meaning.definitions.map((def, defIndex) => (
                  <List.Item key={defIndex}>
                    <Text>{def.definition}</Text>
                    {def.example && (
                      <Text mt="xs" fs="italic" c="dimmed">
                        "{def.example}"
                      </Text>
                    )}
                    {def.synonyms.length > 0 && (
                      <Group gap="xs" mt="xs">
                        <Text size="sm" fw={500}>Synonyms:</Text>
                        {def.synonyms.map((synonym, synIndex) => (
                          <Badge key={synIndex} variant="outline" color="blue">
                            {synonym}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </List.Item>
                ))}
              </List>
            </div>
          ))}
        </Stack>

        {data.sourceUrls.length > 0 && (
          <>
            <Divider my="md" />
            <Text size="sm" c="dimmed">
              Source: {data.sourceUrls.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  {url}
                </a>
              ))}
            </Text>
          </>
        )}
      </Stack>
    </Card>
  );
}