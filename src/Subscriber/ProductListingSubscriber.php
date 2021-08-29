<?php declare(strict_types=1);

namespace MacProductListingSearch\Subscriber;

use Shopware\Core\Content\Product\Events\ProductListingCriteriaEvent;
use Shopware\Core\Content\Product\SearchKeyword\ProductSearchBuilderInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProductListingSubscriber implements EventSubscriberInterface
{
    private ProductSearchBuilderInterface $searchBuilder;

    public function __construct(ProductSearchBuilderInterface $searchBuilder) {
        $this->searchBuilder = $searchBuilder;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductListingCriteriaEvent::class => 'loadProductListingCriteria',
        ];
    }

    public function loadProductListingCriteria(ProductListingCriteriaEvent $event): void
    {
        $request = $event->getRequest();
        if (!$request->get('search')) {
            return;
        }

        $this->searchBuilder->build($request, $event->getCriteria(), $event->getSalesChannelContext());
    }
}
