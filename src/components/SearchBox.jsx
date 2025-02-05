import React, { useState } from 'react';
import { TextInput, Button, Container } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchBoxProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

export function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [word, setWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim()) {
      onSearch(word.trim());
    }
  };

  return (
    <Container size="lg" px={0}>
        <TextInput
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search for a word..."
          size="lg"
          leftSection={<IconSearch size={20} />}
          disabled={isLoading}
          rightSectionWidth={100}
          rightSection={
            <Button
              type="submit"
              disabled={isLoading || !word.trim()}
              loading={isLoading}
              w={90}
              onClick={handleSubmit}
            >
              Search
            </Button>
          }
        />
    </Container>
  );
}