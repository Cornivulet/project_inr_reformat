start: ## Démarrer l'application
	docker-compose up --build

k6: ## Démarrer les tests k6
	docker-compose run --rm k6

stop: ## Stopper l'application
	docker-compose down

ngrok: ## Obtenir une url utilisable pour les tests (gtxmetrix, lighthouse, etc)
	ngrok http 3000

help: ## Liste des commandes
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'