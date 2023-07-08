# AWS 배포 자동화 
Cloud 환경(AWS) 으로 컨테이너 이미지 build & push, 배포 자동화

## 💡 아키텍처 다이어그램
<img src="https://github.com/qnddjKJH/devops-04-s2-project/assets/53363080/a553545c-0ab2-4745-aa81-9ac2ccd30296"></img>


## 사용 기술 스택
Javascript, Nodejs, fastify, mongodb<br>
AWS: ECR, ECS, route 53, cloudFront, S3, Secret Manager, ALB
github Actions

## 인프라 소개
- Route 53 을 사용하여 도메인 등록
- S3 의 정적 웹 호스팅을 사용하여 react build Upload
- CDN 서비스인 CloudFront 로 Frontend 배포
  - www. 레코드 등록 연결
- ECR Server application docker image push
- ECS: Cluster 생성, Task 정의 생성. 서비스 생성
  - 사용 이미지는 ECR 에 올린 이미지를 사용 
  - server container 2개, mongodb container 1개 를 따로 띄워서 통신함
- 사용 환경변수는 SecretManager 를 통해 관리
- ALB 를 통해 서비스로 들어오는 트래픽 분산
- ACM 에 등록된 인증서로 HTTPS 설정 (ALB, route53 레코드:cloudfront)
- 위 배포 과정을 github action 으로 배포 자동화
  - CI/CD : Release 또는 tag(x.x 형식의 tag) 가 push 되는 경우 ECR 로 image build & push 후 ECS 자동 배포
