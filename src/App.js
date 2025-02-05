import React, { useState } from 'react';
import { MantineProvider, Container, Stack, Title, Alert, Loader, Group, Text } from '@mantine/core';
import { IconBook2 } from '@tabler/icons-react';
import { SearchBox } from './components/SearchBox';
import { WordDefinition } from './components/WordDefinition';
import '@mantine/core/styles.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wordData, setWordData] = useState(null);

  const searchWord = async (word: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'Word not found' : 'Failed to fetch definition');
      }
      const data = await response.json();
      setWordData(data[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWordData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <Container size="lg" py="xl">
          <Stack align="center" gap="lg">
            <Group>
              <IconBook2 size={32} style={{ color: 'var(--mantine-color-blue-filled)' }} />
              <Title order={1}>Dictionary Lookup</Title>
            </Group>

            <SearchBox onSearch={searchWord} isLoading={isLoading} />

            {error && (
              <Alert variant="light" color="red" className="w-full max-w-2xl">
                {error}
              </Alert>
            )}

            {isLoading && (
              <div className="w-full max-w-2xl p-8 flex justify-center">
                <Loader size="xl" />
              </div>
            )}

            {!isLoading && wordData && <WordDefinition data={wordData} />}

            {!isLoading && !error && !wordData && (
              <Text c="dimmed" ta="center">
                Search for a word to see its definition
              </Text>
            )}
          </Stack>
        </Container>
      </div>
    </MantineProvider>
  );
}

export default App;