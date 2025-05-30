// assets/s3-handler.js - S3 configuration and upload functionality

// --- AWS S3 Configuration ---
const S3_BUCKET_NAME = 'tfs-staff';
const S3_BUCKET_REGION = 'us-east-1';
const S3_IDENTITY_POOL_ID = 'us-east-1:d0db8e7d-4138-4b6a-a47f-7649f598a628';

// Initialize AWS SDK
document.addEventListener('DOMContentLoaded', function() {
    // Configure AWS SDK with the bucket ARN
    AWS.config.update({
        region: S3_BUCKET_REGION,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: S3_IDENTITY_POOL_ID
        })
    });

    // Create S3 service object with specific permissions
    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: S3_BUCKET_NAME }
    });

    // Make the s3 object available globally
    window.s3Handler = {
        s3: s3,
        bucketName: S3_BUCKET_NAME,
        
        // Upload function that can be called from other scripts
        uploadToS3: async function(dataObject, employeeId) {
            const submissionTimestamp = new Date().toISOString();
            const fileName = `training_submissions/${employeeId}_${submissionTimestamp.replace(/:/g, '-')}.json`;
            const jsonData = JSON.stringify(dataObject, null, 2);

            const params = {
                Bucket: S3_BUCKET_NAME,
                Key: fileName,
                Body: jsonData,
                ContentType: 'application/json'
            };

            try {
                const data = await s3.upload(params).promise();
                console.log("Successfully uploaded data to", data.Location);
                return { success: true, location: data.Location };
            } catch (err) {
                console.error("Error uploading data: ", err);
                return { success: false, error: err.message };
            }
        }
    };

    console.log("s3-handler.js loaded with bucket: " + S3_BUCKET_NAME);
});