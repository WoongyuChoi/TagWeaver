import React, { useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ColumnTiptap from "../editor/ColumnTiptap";
import ColumnLexical from "../editor/ColumnLexical";
import ColumnReactQuill from "../editor/ColumnReactQuill";
import useContentStore from "../store/contentStore";

const PlaceholderColumn = (props: { header: string }) => (
  <Stack spacing={2}>
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, minHeight: 180 }}>
      <Typography color="text.secondary">{props.header} (Editor)</Typography>
    </Box>
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, minHeight: 80 }}>
      <Typography color="text.secondary">{props.header} HTML Output</Typography>
    </Box>
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, minHeight: 120 }}>
      <Typography color="text.secondary">{props.header} Sanitized Preview</Typography>
    </Box>
  </Stack>
);

const MainLayout = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
           <Typography variant="h5" fontWeight={700}>TagWeaver</Typography>
            <Button variant="contained" onClick={() => useContentStore.getState().generate()}>
              Generate Sample
            </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
          <ColumnTiptap />
          <ColumnLexical />
          <ColumnReactQuill />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
