
import React from "react";
import { Modal, TextField, Button, Box, IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { Delete } from "@mui/icons-material";

const TaskModal = ({
  open,
  handleClose,
  taskData,
  handleChange,
  handleSave,
  handleFileChange,
  file,
  isEditing,
}) => {
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          label="Title"
          fullWidth
          required
          margin="normal"
          value={taskData?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          required
          margin="normal"
          value={taskData?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <TextField
          label="Deadline"
          type="date"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={formatDateForInput(taskData?.deadline || "")}
          onChange={(e) => handleChange("deadline", e.target.value)}
        />
        {!isEditing && (
          <>
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              id="upload-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-file">
              <Button
                variant="contained"
                component="span"
                style={{ marginTop: 16, marginRight: 16 }}
              >
                {file ? file.name : "Upload PDF"}
              </Button>
              {file && (
                <IconButton
                  sx={{ paddingTop: 4 }}
                  onClick={() => handleFileChange({ target: { files: [] } })}
                >
                  <Delete color="error" />
                </IconButton>
              )}
            </label>
          </>
        )}
        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;