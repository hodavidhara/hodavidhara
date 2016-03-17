FROM elasticsearch:latest
ADD config /usr/share/elasticsearch/config
RUN plugin install lmenezes/elasticsearch-kopf/master
RUN plugin install mobz/elasticsearch-head