import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward,
  ZoomIn,
  ZoomOut,
  RestartAlt,
} from '@mui/icons-material';
import { useGraph } from '../../app/providers/GraphProvider';
import { FunctionList } from '../FunctionList/FunctionList';

export const ControlPanel: React.FC = () => {
  const { graphProps, updateGraphProps, resetGraphProps } = useGraph();

  const moveUp = () => {
    updateGraphProps({
      centerY: graphProps.centerY + 100 / graphProps.zoom,
    });
  };

  const moveDown = () => {
    updateGraphProps({
      centerY: graphProps.centerY - 100 / graphProps.zoom,
    });
  };

  const moveLeft = () => {
    updateGraphProps({
      centerX: graphProps.centerX - 100 / graphProps.zoom,
    });
  };

  const moveRight = () => {
    updateGraphProps({
      centerX: graphProps.centerX + 100 / graphProps.zoom,
    });
  };

  const zoomIn = () => {
    updateGraphProps({ zoom: graphProps.zoom * 1.2 });
  };

  const zoomOut = () => {
    updateGraphProps({ zoom: graphProps.zoom / 1.2 });
  };

  const toggleHighPerf = () => {
    updateGraphProps({
      resolution: graphProps.resolution === 5 ? 1 : 5,
    });
  };

  const toggleAsymptotes = () => {
    updateGraphProps({
      detectAsymptotes: !graphProps.detectAsymptotes,
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 360,
        maxHeight: '100vh',
        overflowY: 'auto',
        p: 2,
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    >
      <Card
        sx={{
          mb: 2,
          backdropFilter: 'blur(10px)',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Graphing Calculator 📈
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={2}>
            {/* Pan Controls */}
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Pan
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 0.5,
                  width: 'fit-content',
                  mx: 'auto',
                }}
              >
                <Box />
                <Tooltip title="Move up">
                  <IconButton onClick={moveUp} color="primary">
                    <ArrowUpward />
                  </IconButton>
                </Tooltip>
                <Box />
                <Tooltip title="Move left">
                  <IconButton onClick={moveLeft} color="primary">
                    <ArrowBack />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset view">
                  <IconButton onClick={resetGraphProps} color="secondary">
                    <RestartAlt />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move right">
                  <IconButton onClick={moveRight} color="primary">
                    <ArrowForward />
                  </IconButton>
                </Tooltip>
                <Box />
                <Tooltip title="Move down">
                  <IconButton onClick={moveDown} color="primary">
                    <ArrowDownward />
                  </IconButton>
                </Tooltip>
                <Box />
              </Box>
            </Box>

            {/* Zoom Controls */}
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Zoom
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Tooltip title="Zoom out">
                  <IconButton onClick={zoomOut} color="primary">
                    <ZoomOut />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom in">
                  <IconButton onClick={zoomIn} color="primary">
                    <ZoomIn />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            <Divider />

            {/* Settings */}
            <FormControlLabel
              control={
                <Switch
                  checked={graphProps.resolution === 1}
                  onChange={toggleHighPerf}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  More accurate graphs (might be slower)
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={graphProps.detectAsymptotes}
                  onChange={toggleAsymptotes}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  Try to detect & fix vertical asymptotes
                </Typography>
              }
            />
          </Stack>
        </CardContent>
      </Card>

      <FunctionList />
    </Box>
  );
};
