import React from 'react';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useGraph } from '../../app/providers/GraphProvider';
import { FunctionPanel } from './FunctionPanel';
import { GraphFunction } from '../../types';

export const FunctionList: React.FC = () => {
  const { functions, addFunction } = useGraph();

  return (
    <Box>
      {functions.map((fn: GraphFunction) => (
        <FunctionPanel key={fn.id} functionData={fn} />
      ))}
      <Button
        fullWidth
        variant="contained"
        startIcon={<Add />}
        onClick={() => addFunction()}
        sx={{
          py: 1.5,
          bgcolor: 'white',
          color: 'text.primary',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        Add another function
      </Button>
    </Box>
  );
};
