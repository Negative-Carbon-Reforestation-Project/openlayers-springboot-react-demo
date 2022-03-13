@echo off
call mvn clean spring-boot:build-image
echo ---
kubectl apply -f k8s\ncrp.yaml
echo ---
kubectl rollout restart deployment/ncrp