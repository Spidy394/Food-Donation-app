import admin from "firebase-admin";

let firebaseInitialized = false;

export const initializeFirebase = async (): Promise<void> => {
  try {
    if (firebaseInitialized) {
      console.log("Firebase already initialized");
      return;
    }

    // Check if required environment variables exist
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

    if (!projectId || !clientEmail || !privateKey) {
      console.warn(
        "⚠️  Firebase credentials missing in environment variables - skipping Firebase initialization"
      );
      console.warn(
        "   This is okay for development, but required for production"
      );
      firebaseInitialized = true; // Mark as initialized to prevent retries
      return;
    }

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"), // Handle newlines in private key
      }),
      storageBucket,
    });

    firebaseInitialized = true;
    console.log("Firebase Admin SDK initialized successfully");
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    throw error;
  }
};

// Export Firebase services as getters (lazy initialization)
export const getAuth = () => admin.auth();
export const getStorage = () => admin.storage();
export const getFirestore = () => admin.firestore();

// Helper function to verify Firebase ID token
export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};

// Helper function to upload file to Firebase Storage
export const uploadToStorage = async (
  file: Buffer,
  destination: string,
  contentType: string
): Promise<string> => {
  try {
    const bucket = getStorage().bucket();
    const blob = bucket.file(destination);

    await blob.save(file, {
      contentType,
      public: true,
      metadata: {
        firebaseStorageDownloadTokens: crypto.randomUUID(),
      },
    });

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    return publicUrl;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};

// Helper function to delete file from Firebase Storage
export const deleteFromStorage = async (filePath: string): Promise<void> => {
  try {
    const bucket = getStorage().bucket();
    await bucket.file(filePath).delete();
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error("File deletion failed:", error);
    throw error;
  }
};
