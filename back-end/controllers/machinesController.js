const fs = require('fs');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

exports.spawnContainer = (req, res) => {
    const uniqueId = uuidv4();
    const jobYaml = `
apiVersion: batch/v1
kind: Job
metadata:
  name: c-dev-job-${uniqueId}
spec:
  template:
    spec:
      containers:
      - name: c-dev
        image: gcc:latest
        command: ["bash", "-c", "sleep 60; exit 0"]
      restartPolicy: Never
  backoffLimit: 0
  activeDeadlineSeconds: 60
`;

    const filePath = `/tmp/c-dev-job-${uniqueId}.yaml`;
    fs.writeFileSync(filePath, jobYaml);

    exec(`kubectl apply -f ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        if (stderr) {
            return res.status(500).json({ message: stderr });
        }
        res.json({ message: 'Job lancé avec succès', output: stdout });
    });
};
