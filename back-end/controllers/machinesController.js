const fs = require('fs');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid'); // Assurez-vous d'installer le package 'uuid'

exports.spawnContainer = (req, res) => {
    const uniqueId = uuidv4();
    const deploymentYaml = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: c-dev-${uniqueId}
  labels:
    app: c-dev
spec:
  replicas: 1
  selector:
    matchLabels:
      app: c-dev
  template:
    metadata:
      labels:
        app: c-dev
    spec:
      containers:
      - name: c-dev
        image: gcc:latest
        args: ["bash", "-c", "while true; do sleep 1000; done"]
`;

    const filePath = `/tmp/c-dev-${uniqueId}.yaml`;
    fs.writeFileSync(filePath, deploymentYaml);

    exec(`kubectl apply -f ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        if (stderr) {
            return res.status(500).json({ message: stderr });
        }
        res.json({ message: 'Pod lancé avec succès', output: stdout });
    });
};
