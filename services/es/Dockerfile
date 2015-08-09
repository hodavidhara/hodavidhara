FROM elasticsearch
COPY config /usr/share/elasticsearch/config
RUN plugin -i lmenezes/elasticsearch-kopf/master
RUN plugin -i mobz/elasticsearch-head

ENV ES_HEAP_SIZE 128m
