FROM python:3.9.7

WORKDIR /usr/src/app

COPY ./requirements.txt .
ENV PIP_DEFAULT_TIMEOUT=100
RUN pip install -r requirements.txt

COPY . .

RUN mkdir -p /var/log/server_logs
RUN chmod 777 /var/log/server_logs

EXPOSE 5000

RUN chmod ugo+x ./entrypoint.sh