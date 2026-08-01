#!/bin/bash
# Wait for rate limit to clear, then test AI
echo "Waiting for rate limit to clear..."
for i in {1..30}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:3000/api/ai/generate \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"ping"}],"maxNewTokens":10}')
  if [ "$STATUS" != "429" ]; then
    echo "Limit cleared after ${i} attempts (status: $STATUS)"
    break
  fi
  sleep 2
done

echo ""
echo "Final test:"
curl -s -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Salam, sən kimsən? Qısa cavab ver."}],"maxNewTokens":100}'
echo ""
