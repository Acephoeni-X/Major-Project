FROM ubuntu:latest
WORKDIR /app
COPY requirements.txt .
RUN apt-get update -y
RUN apt install python3 python3-pip -y
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["python", "main.py"]