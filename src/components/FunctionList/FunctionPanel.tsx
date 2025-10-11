import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  IconButton,
  Box,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Delete,
  Visibility,
  VisibilityOff,
  ContentCopy,
  Palette,
} from '@mui/icons-material';
import { useGraph } from '../../app/providers/GraphProvider';
import { getNextColor } from '../../utils/mathUtils';

interface FunctionPanelProps {
  functionData: {
    id: string;
    text: string;
    color: string;
    hidden: boolean;
    invalid: boolean;
  };
}

export const FunctionPanel: React.FC<FunctionPanelProps> = ({ functionData }) => {
  const { removeFunction, updateFunction, addFunction } = useGraph();
  const [localText, setLocalText] = React.useState(functionData.text);

  React.useEffect(() => {
    setLocalText(functionData.text);
  }, [functionData.text]);

  const handleBlur = () => {
    if (localText !== functionData.text) {
      updateFunction(functionData.id, { text: localText });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleToggleVisibility = () => {
    updateFunction(functionData.id, { hidden: !functionData.hidden });
  };

  const handleDuplicate = () => {
    addFunction(functionData.text);
  };

  const handleChangeColor = () => {
    updateFunction(functionData.id, { color: getNextColor() });
  };

  const handleDelete = () => {
    removeFunction(functionData.id);
  };

  return (
    <Card
      sx={{
        bgcolor: functionData.color,
        opacity: functionData.hidden ? 0.5 : 1,
        transition: 'opacity 0.2s',
        mb: 2,
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.4)',
                color: 'white',
                px: 1.5,
                py: 1,
                borderRadius: 1,
                fontWeight: 600,
                minWidth: 40,
                textAlign: 'center',
              }}
            >
              y =
            </Box>
            <TextField
              fullWidth
              value={localText}
              onChange={(e) => setLocalText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="log(), sqrt(), abs(), trig supported"
              error={functionData.invalid}
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: functionData.invalid
                    ? 'rgba(255, 200, 200, 0.9)'
                    : 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                  },
                  '&.Mui-focused': {
                    bgcolor: 'white',
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              size="small"
            />
          </Box>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={functionData.hidden ? 'Show' : 'Hide'}>
              <IconButton
                size="small"
                onClick={handleToggleVisibility}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                {functionData.hidden ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Duplicate">
              <IconButton
                size="small"
                onClick={handleDuplicate}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change color">
              <IconButton
                size="small"
                onClick={handleChangeColor}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
              >
                <Palette fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
