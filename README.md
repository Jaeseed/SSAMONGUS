# 구미 1반 8팀

1. 커밋 유형 지정

   - FEAT : 새로운 기능의 추가

   - FIX : 버그 수정

   - DOCS : 문서 수정

   - STYLE : 스타일 관련 기능 (코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)

   - REFACTOR : 코드 리펙토링

   - TEST : 테스트 코드, 리펙토링 테스트 코드 추가

   - CHORE : 빌드 업무 수정, 패키지 매니저 수정 (ex. gitignore 수정 같은 경우)

2. 커밋 메시지 예시
   - git commit -m "커밋 유형:커밋 메시지" (ex. git commit -m "CHORE:update README")
   - 커밋 메시지 최대한 상세하게 쓰기 !
   
3. 브랜치 명 규칙

   | 브랜치 명 | 내용                   | 비고                            |
   | --------- | ---------------------- | ------------------------------- |
   | master    | Git 저장소 기본 브랜치 | -                               |
   | develop   | 개발 브랜치            | -                               |
   | release   | 릴리즈 브랜치          | 사용할 때도 있고 안할 때도 있음 |
   | feature   | 기능 개발 브랜치       | -                               |
   | bugfix    | 버그 수정 브랜치       | -                               |

   - master, develop 및 release 브랜치는 고정된 이름으로 사용

   - feature와 bugfix 브랜치는 필요시 맞는 이름을 사용하여 구성

   - 예시
     - feature/api-user-remove
     - feature/user-api-remove
     - bugfix/ISSUE-001



![Image Pasted at 2022-1-17 14-51](C:\Users\multicampus\Desktop\S06P12D108\Image Pasted at 2022-1-17 14-51.png)

