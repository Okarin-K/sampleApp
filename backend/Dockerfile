FROM --platform=linux/x86_64 node

FROM --platform=linux/x86_64 node

RUN apt update
RUN apt install -y locales
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP

ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app
