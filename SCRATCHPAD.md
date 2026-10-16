# No-transfer and polling fixes, 16 October 2026

- Parts 1 to 5 in order, one commit each. Transfer off by default, callback message, resilient status polling, configurable demo end hour, gates once.
- No calls, deployment, env/key/allow-list/model/calling-setting changes. Nothing DONE.
- After passing gates, wait for Ganesh's deploy line. Only after authorised deploy prepare a new QA demo; never call without separate authority.
- Real-airline task waits until this prerequisite is deployed. Earlier live proof gaps remain logged.
