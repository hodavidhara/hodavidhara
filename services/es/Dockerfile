FROM elasticsearch
VOLUME /data/es
COPY config /usr/share/elasticsearch/config
RUN plugin -i lmenezes/elasticsearch-kopf/master
RUN plugin -i mobz/elasticsearch-head
