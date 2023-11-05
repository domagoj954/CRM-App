import React, { useEffect, useState } from "react";
import { imageDb } from "./Firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import classes from "./Card.module.css";
import DialogContentText from "@mui/material/DialogContentText";

import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

function Documents() {
  const [imgUrl, setImgUrl] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDeleteUrl, setDocumentToDeleteUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedClient, setSelectedClient] = useState(() => {
    return localStorage.getItem("selectedClient") || "";
  });
  const [newCard, setNewCard] = useState(null);
  const clients = useSelector((state) => state.clients.clients);

  const fileShare = (file) => {
    setSelectedFile(file);
  };

  const deleteDocument = (url) => {
    setDocumentToDeleteUrl(url);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (documentToDeleteUrl) {
      const imgRef = ref(imageDb, documentToDeleteUrl);
      deleteObject(imgRef).then(() => {
        setImgUrl(
          imgUrl.filter((imageUrl) => imageUrl !== documentToDeleteUrl)
        );
        setIsDeleteDialogOpen(false);
      });
    }
  };

  const imageView = (url) => {
    setSelectedImageUrl(url);
    setIsViewDialogOpen(true);
  };

  const createCard = async () => {
    if (!selectedFile || !selectedClient) {
      return;
    }

    const filename = v4();
    const imgRef = ref(imageDb, `files/${filename}`);

    try {
      await uploadBytes(imgRef, selectedFile);

      const newCard = {
        imageUrl: URL.createObjectURL(selectedFile),
        clientName: selectedClient,
      };

      setImgUrl((data) => [...data, newCard.imageUrl]);
      setSelectedFile(null);
      setIsUploadDialogOpen(false);
      setNewCard(newCard);
      setSelectedClient("");

      localStorage.setItem("selectedClient", selectedClient);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
    setSelectedClient("");
    setSelectedFile(null);
  };

  useEffect(() => {
    listAll(ref(imageDb, "files"))
      .then((imgs) => {
        Promise.all(imgs.items.map((val) => getDownloadURL(val)))
          .then((urls) => {
            setImgUrl(urls);
          })
          .catch((error) => {
            console.error("Error getting image URLs:", error);
          });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

  return (
    <div className="Documents">
      <Button
        style={{ marginLeft: 10 }}
        variant="contained"
        onClick={() => setIsUploadDialogOpen(true)}
      >
        Share File
      </Button>
      <br />

      <div className={classes.container}>
        {imgUrl.map((url, index) => (
          <Card style={{ width: 300 }} key={index} className={classes.card}>
            <CardMedia
              component="img"
              alt={`Image ${index}`}
              height="200"
              image={url}
              style={{ cursor: "pointer" }}
              onClick={() => imageView(url)}
            />
            <CardContent>
              <Button
                color="error"
                variant="contained"
                onClick={() => deleteDocument(url)}
              >
                Delete
              </Button>
              {newCard && newCard.imageUrl === url && (
                <p>Client: {newCard.clientName}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
      >
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          {selectedImageUrl && (
            <img
              src={selectedImageUrl}
              alt="Full Size Image"
              style={{ width: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsViewDialogOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
      >
        <div style={{ minWidth: 400 }}>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogContent>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              onChange={(e) => fileShare(e.target.files[0])}
            />
            <label htmlFor="fileInput">
              <Button
                variant="contained"
                component="span"
                style={{ marginBottom: "10px" }}
                size="small"
              >
                Choose File
              </Button>
            </label>
            <FormControl fullWidth>
              <InputLabel>Client Name</InputLabel>
              <Select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                <MenuItem value="">Select a client</MenuItem>
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Image"
                style={{ width: "100%" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <div
              style={{
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 20,
                paddingBottom: 16,
              }}
            >
              <Button
                style={{ float: "right" }}
                variant="contained"
                color="primary"
                onClick={createCard}
              >
                Upload
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleUploadDialogClose}
              >
                Cancel
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this document?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Documents;
